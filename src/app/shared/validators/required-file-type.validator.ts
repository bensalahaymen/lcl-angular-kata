import {FormControl} from '@angular/forms';

export function requiredFileType(type: string | string[]) {
  return (control: FormControl) => {
    const fileName = control.value;
    if (fileName) {
      const extension = fileName.split('.').pop().toLowerCase();
      if (Array.isArray(type)) {
        if (!type.some(t => t.toLowerCase() === extension)) {
          return {requiredFileType: true};
        } else {
          return null;
        }
      } else {
        if (type.toLowerCase() !== extension) {
          return {requiredFileType: true};
        }
        return null;
      }

    }
    return null;
  };
}
