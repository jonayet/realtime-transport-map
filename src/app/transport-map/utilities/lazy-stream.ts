import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/observable/timer';

import { ControlledStream } from './ControlledStream';

export function doLazyStream<T = any>(routes: T[], routesPerBatch = 10, interval = 10000): Observable<T> {
  const stream = new ControlledStream<T>(routes);
  let timerSubscription: Subscription;
  let streamSubscription: Subscription;
  let observer: Subscriber<T>;

  const observable = new Observable<T>(_observer => {
    observer = _observer;
    return () => {
      timerSubscription.unsubscribe();
      streamSubscription.unsubscribe();
      observer.unsubscribe();
    };
  });

  timerSubscription = Observable.timer(0, interval).subscribe(() => {
    stream.request(routesPerBatch);
  });

  streamSubscription = stream.source.subscribe((route) => {
    observer.next(route);
  }, (err) => {
    observer.error();
  }, () => {
    observer.complete();
  });

  return observable;
}
