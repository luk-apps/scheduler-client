import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  detailsVisible = false;

  constructor() { }

  ngOnInit(): void {

  }

  showDetails() {
    this.detailsVisible = true;
    setTimeout(() => {
      let element = document.getElementById("details");
      element.scrollIntoView({ behavior: "smooth" });
    }, 50)
  }
}
