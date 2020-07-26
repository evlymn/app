import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadMetadata } from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  upload(path: string, file: any, metadata?: UploadMetadata): AngularFireUploadTask {
    return this.storage.ref(path).put(file, metadata);
  }

  delete(path: string) {
    return this.storage.storage.ref(path).delete();
  }

  fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async base64ToFile(base64: string, fileName: string, options: any) {
    return await fetch(base64).then(res =>
      res.blob().then(blob => new File([blob], fileName, options))
    );
  }
}
