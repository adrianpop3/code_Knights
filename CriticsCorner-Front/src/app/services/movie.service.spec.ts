import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

import { MovieService } from './movie.service';
import { Movie } from 'app/entities/movie';

fdescribe('MovieService', () => {
  let service: MovieService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let toastrSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ToastrService, useValue: toastrSpy }],
    });

    service = TestBed.inject(MovieService);
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getMovies()', () => {
    it('should return an Observable<Movie[]>', () => {
      const dummyMovies: Movie[] = [
      { 
        id: 1,
        title: 'Test',
        category: 'Mock',
        ranking: 8,
        description: 'Test Service',
        imageUrl: 'something/images',
      },
      {
        id: 1,
        title: 'Test',
        category: 'Mock',
        ranking: 8,
        description: 'Test Service',
        imageUrl: 'something/images',
      }
      ];

      service.getMovies().subscribe((movies) => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(dummyMovies);
      });

      const req = httpMock.expectOne(`${service.baseUrl}/all`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyMovies);
    });
  });

  describe('#addMovie()', () => {
    it('should return a new Observable<Movie>', () => {
      const dummyMovie: Movie = {
        id: 1,
        title: 'Test',
        category: 'Mock',
        ranking: 8,
        description: 'Test Service',
        imageUrl: 'something/images',
      };

      service
        .addMovie(dummyMovie)
        .subscribe((movie) => {
          expect(movie).toEqual(dummyMovie);
        });

      const req = httpMock.expectOne(`${service.baseUrl}/add`);
      expect(req.request.method).toBe('POST');
      // req.flush(dummyMovie);
    });
  });

  describe('#updateMovie()', () => {
    it('should return an Observable<Movie> with updated value', () => {
      const dummyMovie: Movie = {
        id: 1,
        title: 'Test',
        category: 'Mock',
        ranking: 8,
        description: 'Test Service',
        imageUrl: 'something/images',
      };

      service
        .updateMovie(dummyMovie)
        .subscribe((movie) => {
          expect(movie).toEqual(dummyMovie);
        });

      const req = httpMock.expectOne(
        `${service.baseUrl}/update`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(dummyMovie);
    });
  });

  describe('#deleteMovie()', () => {
    it('should delete given Observable<Movie>', () => {
      const dummyMovie: Movie = {
        id: 1,
        title: 'Test',
        category: 'Mock',
        ranking: 8,
        description: 'Test Service',
        imageUrl: 'something/images',
      };

      service.deleteMovie(dummyMovie.id).subscribe((res) => {
        expect(res).toBeNull();
      });

      const req = httpMock.expectOne(
        `${service.baseUrl}/delete/${dummyMovie.id}`
      );
      expect(req.request.method).toBe('DELETE');
      // req.flush(dummyMovie);
    });
  });

  describe('#getMovie()', () => {
    it('should return an Observable<Movie>', () => {
      const dummyMovie: Movie = {
        id: 1,
        title: 'Test',
        category: 'Mock',
        ranking: 8,
        description: 'Test Service',
        imageUrl: 'something/images',
      }

      service
        .getMovie(dummyMovie)
        .subscribe((movie) => {
          expect(movie).toEqual(dummyMovie);
        });

      const req = httpMock.expectOne(
        `${service.baseUrl}/movie/${dummyMovie.id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyMovie);
    });
  });
});
