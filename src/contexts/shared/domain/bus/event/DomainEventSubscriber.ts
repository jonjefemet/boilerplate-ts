import { DomainEvent } from './DomainEvent';
import { DomainEventName } from './DomainEventName';

export interface DomainEventSubscriber<T extends DomainEvent> {
  on(domainEvent: T): Promise<void>;

  subscribedTo(): Array<DomainEventName<T>>;

  name(): string;
}
