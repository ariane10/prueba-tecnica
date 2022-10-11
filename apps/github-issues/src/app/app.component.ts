import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RestApiService } from './services/rest-api.service';
import { Store } from '@ngrx/store';
import { loadedIssues } from './state/action/issues.actions';
import { selectListIssues } from './state/selectors/issues.selectors';

@Component({
  selector: 'prueba-tecnica-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  title = "github-issues";

  protected urlField: FormControl;
  protected url = "";

  subscription: Subscription | undefined;

  // pagination
  protected pag = 1;
  protected per_pag = 5;

  // validation
  @ViewChild('urlElem') urlElem!: ElementRef;
  protected errorUrl = "The provided url is not valid";

  // ngrx
  issues$: Observable<any> = new Observable();

  constructor(
    private restApiService: RestApiService,
    private store: Store<any>
    ) {
    this.urlField = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.issues$ = this.store.select(selectListIssues)
  }


  submit(): void {
    this.url = this.urlField.getRawValue();
    this.urlField.reset();
    this.pag = 1;
    this.searchIssues();
  }

  searchIssues(): void {

    // para pruebas
    // https://github.com/ariane10/docker-exercises
    //

    const url = this.url.split("github.com")[1];

    if (url != undefined) {
      this.subscription = this.restApiService.getRepositoryIssues(url, this.per_pag, this.pag).subscribe(
        res => {
          this.urlElem.nativeElement.classList.remove('is-invalid');
          this.store.dispatch(loadedIssues(
            { issues: res }
          ))
        },
        () => {
          this.urlElem.nativeElement.classList.add('is-invalid');
          this.store.dispatch(loadedIssues(
            { issues: [] }
          ))
        })

    } else {
      this.urlElem.nativeElement.classList.add('is-invalid');
      this.store.dispatch(loadedIssues(
        { issues: [] }
      ))
    }

  }

  previous(): void {
    this.pag--;
    this.searchIssues();

  }

  next(): void {
    this.pag++;
    this.searchIssues();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }



  // TODO: control de errores
  // TODO: comprobar el model y meterte más cosas
  // TODO: cambiar readme
  // TODO: testing

}
