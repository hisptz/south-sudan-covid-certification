import { Observable } from "rxjs";
import { take } from "rxjs/operators";

export async function getRequestPromise(
  requestFunction$:  Observable<any>,
  data?: any,
) {
  
    return new Promise((resolve, reject) => {
      requestFunction$
        .pipe(take(1))
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
}
