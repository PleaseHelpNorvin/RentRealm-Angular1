import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { NoAuthGuard } from './noauth.guard'; // Assuming it's a class

describe('noauthGuard', () => {
  let guard: NoAuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAuthGuard, AuthService, Router]
    });

    guard = TestBed.inject(NoAuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBe(true);
  });

  it('should deny activation if logged in and redirect to home', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(router, 'navigate');

    const result = guard.canActivate({} as any, { url: '/protected' } as any);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home']); // Adjust based on your logic
  });
});
