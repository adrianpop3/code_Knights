import { TestBed, getTestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/classes/user';

fdescribe('LoginService', () => {
  let service: LoginService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let toastrSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ToastrService, useValue: toastrSpy }],
    });

    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    service = TestBed.inject(LoginService);
  });

  afterEach(() => {
    httpMock.verify();
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loginUser()', () => {
    it('should return an Observable<User>', () => {
      const dummyUser: User = {
        id: 1,
        username: 'testun',
        password: 'passun',
        confirmpassword: 'passun',
        email: 'test@email.com',
      }

      service
        .loginUser(dummyUser)
        .subscribe((user) => {
          expect(user).toEqual(dummyUser);
        });

      const req = httpMock.expectOne(
        `${service.baseUrl}`
      );
      expect(req.request.method).toBe('POST');
      req.flush(dummyUser);
    });
  });
});
