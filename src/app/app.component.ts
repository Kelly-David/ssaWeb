import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';
import { GlobalConfiguration } from './shared/models/GlobalConfiguration';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ssaWeb';

  public globalConfig!: Observable<GlobalConfiguration | null>;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {

    this.globalConfig = this.configService.GlobalConfig;

  }
}
