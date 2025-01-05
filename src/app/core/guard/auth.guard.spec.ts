import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, AuthService, Router],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const result = authGuard.canActivate({} as any, {} as any);
    expect(result).toBe(true);
  });

  it('should deny activation if not logged in and redirect to login', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');

    const result = authGuard.canActivate({} as any, { url: '/protected' } as any);
    
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { redirectTo: '/protected' } });
  });
});
