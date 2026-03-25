import { registerLicense } from '@syncfusion/ej2-base';

const key = process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE;

if (key) {
  registerLicense(key);
} else {
  console.error('Syncfusion license key missing');
}