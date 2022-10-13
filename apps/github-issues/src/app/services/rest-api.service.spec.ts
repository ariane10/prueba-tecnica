import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RestApiService } from './rest-api.service';

describe('RestApiService', () => {
  let service: RestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestApiService]
    });
    service = TestBed.inject(RestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should be return empty array', () => {
    const url = "https://github.com/user/repository"    // repositorio no existente
    service.getRepositoryIssues(url, 5, 1).subscribe(res => {
      expect(res).toEqual([])
    })
  });
});
