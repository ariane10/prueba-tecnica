import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RepositoryIssuesOUT } from './models/repositoryIssuesOUT';
import { RestApiService } from './services/rest-api.service';

@Component({
  selector: 'prueba-tecnica-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnDestroy {

  protected urlField: FormControl;
  protected issueList: RepositoryIssuesOUT[] = [];
  protected url = "";

  subscription: Subscription | undefined;

  // pagination
  protected pag = 1;
  protected per_pag = 5;

  // validation
  @ViewChild('urlElem') urlElem!: ElementRef;
  protected errorUrl = "The provided url is not valid";

  constructor(protected restApiService: RestApiService) {
    this.urlField = new FormControl('', [Validators.required]);
  }


  submit(): void {
    this.url = this.urlField.getRawValue();
    this.urlField.reset();
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
          this.issueList = res;
        },
        () => {
          this.urlElem.nativeElement.classList.add('is-invalid');
          this.issueList = [];
        })

    } else {
      this.urlElem.nativeElement.classList.add('is-invalid');
      this.issueList = [];
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

}
