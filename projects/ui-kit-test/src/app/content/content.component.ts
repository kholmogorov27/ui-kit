import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  currentPath = ''

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.currentPath = url[0].path
    })
  }
}
