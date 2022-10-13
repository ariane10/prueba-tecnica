import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadIssues, loadedIssues } from './state/action/issues.actions';
import { selectLoading, selectListIssues } from './state/selectors/issues.selectors';

@Component({
  selector: 'prueba-tecnica-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  title = "github-issues";

  urlField: FormControl;  // no está protected para poder acceder desde el archivo de testing
  protected url = "";

  subscription: Subscription | undefined;

  // pagination
  protected pag = 1;
  protected per_pag = 5;

  // validation
  @ViewChild('urlElem') urlElem!: ElementRef;
  protected errorUrl = "The provided url is not valid";

  // ngrx
  loading$: Observable<any> = new Observable();
  issues$: Observable<any> = new Observable();

  constructor(
    private store: Store<any>
    ) {
    this.urlField = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.issues$ = this.store.select(selectListIssues) 
  }


  submit(): void {
    this.url = this.urlField.getRawValue();
    this.pag = 1;
    this.searchIssues();
  }

  searchIssues(): void {

    const url = this.url.split("github.com")[1];

    if (url != undefined) {
      this.store.dispatch(loadIssues({url: url, per_pag: this.per_pag, pag: this.pag}))
      /*this.subscription = this.restApiService.getRepositoryIssues(url, this.per_pag, this.pag).subscribe(
        res => {
          this.urlElem.nativeElement.classList.remove('is-invalid');
          this.urlField.reset();
          this.store.dispatch(loadedIssues(
            { issues: res }
          ))
        },
        () => {
          this.urlElem.nativeElement.classList.add('is-invalid');
          this.store.dispatch(loadedIssues(
            { issues: [] }
          ))
        })*/

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

}
