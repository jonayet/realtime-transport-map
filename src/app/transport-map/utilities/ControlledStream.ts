import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

export class ControlledStream<T> {
  source: Observable<T>;

  private observer: Subscriber<T>;
  private streamData: T[];
  private streamIndex: number;

  constructor(private data: T[]) {
    this.streamData = [].concat(data);
    this.streamIndex = 0;

    // TODO: use rxjs Subject
    this.source = new Observable<T>(observer => {
      this.observer = observer;
      return () => {
        observer.unsubscribe();
      };
    });
  }

  request(count: number) {
    if (!this.observer.closed && this.streamData.length === 0) {
      this.observer.complete();
      return;
    }
    for (let i = 0; i < count; i++) {
      if (this.observer.closed) {
        break;
      }
      this.observer.next(this.streamData[this.streamIndex]);
      this.streamIndex++;
      if (this.streamIndex === this.streamData.length) {
        this.observer.complete();
        break;
      }
    }
  }

  hasLeft() {
    return this.streamData.length - this.streamIndex;
  }
}
