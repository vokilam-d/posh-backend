import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Order } from '../../order/schemas/order.schema';
import { Ingredient } from '../../ingredient/schemas/ingredient.schema';

export enum EventName {
  NewOrder = 'NEW_ORDER',
  IngredientUpdate = 'INGREDIENT_UPDATE',
  AppError = 'APP_ERROR',
}

type EventMap = {
  [EventName.NewOrder]: [Order];
  [EventName.IngredientUpdate]: [Ingredient];
  [EventName.AppError]: [unknown, string];
}

@Injectable()
export class EventsService {

  private readonly eventEmitter = new EventEmitter<EventMap>();

  get on() { return this.eventEmitter.on; }
  get once() { return this.eventEmitter.once; }
  get off() { return this.eventEmitter.off; }
  get emit() { return this.eventEmitter.emit; }

}
