import Uuid from '../../value_object/common/Uuid';

export type DomainEventAttributes = { [key: string]: unknown };

export abstract class DomainEvent {
  public readonly eventId: string;

  public readonly occurredOn: Date;

  protected constructor(
    public readonly eventName: string,
    public readonly aggregateId: string,
    eventId?: string,
    occurredOn?: Date,
  ) {
    this.eventId = eventId ?? Uuid.random().valueOf();
    this.occurredOn = occurredOn ?? new Date();
  }

  static readonly fromPrimitives: (
    aggregateId: string,
    eventId: string,
    occurredOn: Date,
    attributes: DomainEventAttributes,
  ) => DomainEvent;

  abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass<T extends DomainEvent = DomainEvent> = {
  new (...args: any[]): T;
  eventName: string;
};
