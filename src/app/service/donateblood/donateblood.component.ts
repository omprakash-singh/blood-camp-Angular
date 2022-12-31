import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { firebase } from '../../../../firebase-config';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
const storage = getStorage(firebase);
const db = getFirestore(firebase);

@Component({
  selector: 'app-donateblood',
  templateUrl: './donateblood.component.html',
  styleUrls: ['./donateblood.component.css'],
})
export class DonatebloodComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogoutUser() {
    console.log('click');

    localStorage.removeItem('CurrentUser');
    this.router.navigate(['auth/login']);
  }

  progress = 0;
  isUpload = false;
  imageUrl = '';

  onFilechange(files: any) {
    // this.fileToUpload = files.item(0);
    console.log(files.target.files[0]);

    const file = files.target.files[0];

    // Create the file metadata
    /** @type {any} */
    const metadata: any = {
      contentType: 'image/jpeg',
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log('Upload is ' + this.progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.isUpload = true;
          this.imageUrl = downloadURL;
        });
      }
    );
  }
  userId: any = '';

  onSubmitUser(formData: NgForm) {
    const { name, email, contact, bloodGroup } = formData.value;
    setDoc(doc(db, 'BloodDonar', email), {
      name: name,
      email: email,
      contact: contact,
      bloodGroup: bloodGroup,
      imageUrl: this.imageUrl,
    })
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
