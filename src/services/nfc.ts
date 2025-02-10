/// <reference types="w3c-web-nfc" />

export interface NFCReadResult {
  id: string;
  content: string;
  type: string;
  timestamp: number;
}

export interface NFCService {
  isSupported: boolean;
  isPermissionGranted: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  onTagRead: (callback: (result: NFCReadResult) => void) => void;
}

class NFCServiceImpl implements NFCService {
  private reader: NDEFReader | null = null;
  private tagReadCallback: ((result: NFCReadResult) => void) | null = null;

  constructor() {
    this.handleReading = this.handleReading.bind(this);
    this.handleReadingError = this.handleReadingError.bind(this);
  }

  get isSupported(): boolean {
    return 'NDEFReader' in window;
  }

  get isPermissionGranted(): boolean {
    return !!this.reader;
  }

  async startScanning(): Promise<void> {
    if (!this.isSupported) {
      throw new Error('NFC is not supported on this device');
    }

    try {
      this.reader = new NDEFReader();
      await this.reader.scan();
      
      this.reader.addEventListener('reading', this.handleReading as EventListener);
      this.reader.addEventListener('readingerror', this.handleReadingError);
    } catch (error) {
      console.error('Error starting NFC scan:', error);
      throw error;
    }
  }

  stopScanning(): void {
    if (this.reader) {
      this.reader.removeEventListener('reading', this.handleReading as EventListener);
      this.reader.removeEventListener('readingerror', this.handleReadingError);
      this.reader = null;
    }
  }

  onTagRead(callback: (result: NFCReadResult) => void): void {
    this.tagReadCallback = callback;
  }

  private handleReading(event: NDEFReadingEvent): void {
    if (!this.tagReadCallback) return;

    const { message, serialNumber } = event;
    const records = message.records;
    const content = records.map(record => {
      try {
        return new TextDecoder().decode(record.data);
      } catch {
        return '';
      }
    }).join(' ');

    this.tagReadCallback({
      id: serialNumber,
      content,
      type: records[0]?.recordType || 'unknown',
      timestamp: Date.now()
    });
  }

  private handleReadingError(error: Event): void {
    console.error('Error reading NFC tag:', error);
  }
}

export const nfcService = new NFCServiceImpl(); 