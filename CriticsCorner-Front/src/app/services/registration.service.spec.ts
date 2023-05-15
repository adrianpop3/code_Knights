import { TestBed, getTestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { User } from 'app/classes/user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

fdescribe('RegistrationService', () => {
  let service: RegistrationService;
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
    service = TestBed.inject(RegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#registerUser()', () => {
    it('should return an Observable<User>', () => {
      const dummyUser: User = {
        id: 1,
        username: 'testun',
        password: 'passun',
        confirmpassword: 'passun',
        email: 'test@email.com',
      }

      service
        .registerUser(dummyUser)
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
