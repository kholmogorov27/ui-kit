import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from '../types';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  currentPath = ''

  @Input() links: Link[] = []
  @Output() pathChange = new EventEmitter()

  constructor(
    private router: Router
  ) {}

  getIsActive = (path: string) => this.currentPath === path

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((value) => {
      this.currentPath = (value as NavigationEnd).url.slice(1)
      this.pathChange.emit(this.currentPath)
    })
  }
}
