import { Injectable } from '@angular/core';
import {
  LoadingController,
  ToastController,
  ToastOptions,
  LoadingOptions,
  AlertController,
  AlertOptions,
  ModalController,
  ModalOptions,
  ActionSheetController,
  ActionSheetOptions,
  PickerController,
  PickerOptions,
  Platform
} from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private plt: Platform,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public pickerController: PickerController,
    public translate: TranslateService,
  ) {}

  log(...args: any[]) {
    console.log(...args);
  }

  async presentToast(
    message: string,
    opts?: ToastOptions
  ): Promise<HTMLIonToastElement> {

    try {
      await this.toastController.dismiss();
    } catch {}

    const defaultOpts: ToastOptions = {
      color: 'medium',
      position: 'top',
      duration: 2000,
    };
    const toast = await this.toastController.create(
      Object.assign({}, defaultOpts, { message }, opts)
    );
    await toast.present();

    return toast;
  }

  async presentToastWithTranslate(
    message: string,
    opts?: ToastOptions
  ): Promise<HTMLIonToastElement> {
    return this.presentToast(this.translate.instant(message), opts);
  }

  async presentErrorToast(
    message: string,
    opts?: ToastOptions
  ): Promise<HTMLIonToastElement> {
    return this.presentToast(message, {...opts, color: 'danger'});
  }

  async dismissToast(data?: any, role?: string, id?: string): Promise<boolean> {
    return this.toastController.dismiss(data, role, id);
  }

  async presentLoading(
    message: string = '',
    opts?: LoadingOptions
  ): Promise<HTMLIonLoadingElement> {

    try {
      await this.loadingController.dismiss();
    } catch {}

    const defaultOpts: ToastOptions = {};
    const loading = await this.loadingController.create(
      Object.assign({}, defaultOpts, { message }, opts)
    );
    await loading.present();

    return loading;
  }

  async dismissLoading(
    data?: any,
    role?: string,
    id?: string
  ): Promise<boolean> {
    const loading = await this.loadingController.getTop();
    if (loading) {
      return this.loadingController.dismiss(data, role, id);
    }
    return false;
  }

  async presentAlert(opts?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertController.create(opts);
    await alert.present();
    return alert;
  }

  async presentModal(opts: ModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create(opts);
    modal.present();
    return modal;
  }

  async dismissModal(data?: any, role?: string, id?: string): Promise<boolean> {
    return this.modalController.dismiss(data, role, id);
  }

  async presentActionSheet(opts?: ActionSheetOptions): Promise<HTMLIonActionSheetElement> {
    const actionSheet = await this.actionSheetController.create(opts);
    await actionSheet.present();

    return actionSheet;
  }

  async dismissActionSheet(data?: any, role?: string, id?: string): Promise<boolean> {
    return this.actionSheetController.dismiss(data, role, id);
  }

  async presentPicker(opts?: PickerOptions): Promise<HTMLIonPickerElement> {
    const picker = await this.pickerController.create(opts);
    await picker.present();

    return picker;
  }

  async dismissPicker(data?: any, role?: string, id?: string): Promise<boolean> {
    return this.pickerController.dismiss(data, role, id);
  }

  async shareFile(uri: string, autoDelete: boolean = true): Promise<void> {
    try {
      await Share.share({ url: uri, });
    } finally {
      if (autoDelete) {
        await Filesystem.deleteFile({ path: uri, });
      }
    }
  }

  async saveJsonToCSVFile(data: any[], fileName: string): Promise<string> {
    const blob = this.json2CSV(data);
    const b64 = await this.blobToBase64(blob);
    const result = await Filesystem.writeFile({
      path: `${fileName}.csv`,
      data: b64,
      directory: Directory.Cache,
      recursive: true
    });

    return result.uri;
  }

  json2CSV(data: any[]) {
    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    const blob = new Blob([csvArray], {type: 'text/csv' });
    return blob;
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('blobToBase64 error'));
        }
      };
      // readAsDataURL
      fileReader.readAsDataURL(blob);
      fileReader.onerror = () => {
        reject(new Error('blobToBase64 error'));
      };
    });
  }

  getScreenHeightBasedOnPercentage(percentage: number, defaultHeight: number = 0): number {
    const innerHeight = this.plt.height();
    if (innerHeight) {
      console.log(innerHeight);
      return innerHeight * percentage;
    }
    return defaultHeight;
  }

  getTranslateString(key: string | string[]){
    return this.translate.get(key);
  }
}
