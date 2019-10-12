import { RecordedEvent, EventData, RecordedBlock, BlockData } from '../types/types';

export class EventStore {
  private data: EventData;
  constructor() {
    this.sync();
  }
  public update(event: RecordedEvent): void {
    this.data.push(event);
    chrome.storage.local.set({ events: this.data }, (): void => {
      console.log('Storage updated');
    });
  }
  public sync(): void {
    chrome.storage.local.get(['events'], (events: EventData): void => {
      console.log('Storage synced');
      this.data = events;
    });
  }
}

export class BlockStore {
  private data: BlockData;
  constructor() {
    this.sync();
  }
  public update(block: RecordedBlock): void {
    this.data.push(block);
    chrome.storage.local.set(['events'], (): void => {
      console.log('Storage updated');
    });
  }
  public sync(): void {
    chrome.storage.local.get(['events'], (blocks: BlockData): void => {
      console.log('Storage synced');
      this.data = blocks;
    });
  }
}

// function EventStuff(): (action: EventAction) => EventData | void {
//   let data: EventData;

//   return (action: EventAction) => {
//     switch (action.type) {
//       case 'getEvents':
//         return data;
//       case 'syncEvents':
//         chrome.storage.local.get(['events'], (events: EventData): void => {
//           console.log('Storage synced');
//           this.data = events;
//         });
//         break;
//       case 'addEvent':
//         data.push(action.payload);
//         chrome.storage.local.set({ events: this.data }, (): void => {
//           console.log('Storage updated');
//         });
//         break;
//       default:
//         throw new Error('Incorrect action.type');
//     }
//   }
// }
