import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(environment.JWT_NAME);

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next(clonedRequest);
  } else return next(req);
};
