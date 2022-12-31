import { Component, OnInit } from '@angular/core';
import { getFirestore, doc, getDocs, collection } from 'firebase/firestore';
import { firebase } from '../../../../firebase-config';
import { stringLength } from '@firebase/util';
const db = getFirestore(firebase);

export interface PeriodicElement {
  name: string;
  image: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any[] = [];
  ngOnInit() {
    this.getData();
  }

  name: string = '';
  email: string = '';
  contact: any;
  bloodGroup: any;
  imageUrl: any;
  private async getData() {
    const colRef = collection(db, 'BloodDonar');
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      console.log(doc.data());

      const { name, email, contact, imageUrl, bloodGroup } = doc.data();
      const OnAdDdata = {
        name: name,
        email: email,
        contact: contact,
        imageUrl: imageUrl,
        bloodGroup: bloodGroup,
      };
      this.data.push(OnAdDdata);
    });
  }
}
