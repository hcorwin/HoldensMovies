import {Component, OnInit} from '@angular/core';
import {YouTubePlayerModule} from "@angular/youtube-player";
import {Movie} from "../movie-selection/movie";
import {InfoService} from "./info.service";
import {NgIf} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.component.html',
  imports: [
    YouTubePlayerModule,
    NgIf
  ],
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  currentMovie = this.infoService.selected;

  constructor(
    private infoService: InfoService,
    private sanitizer: DomSanitizer) {
  }

  set(movie: Movie){
    this.infoService.setSelectedMovie(movie);
  }

  sanitizeUrl(videoId: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoId);
  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
}
