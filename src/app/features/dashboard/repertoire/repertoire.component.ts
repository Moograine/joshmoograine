import { Component, OnInit } from '@angular/core';
import { RepertoireService } from '../../../../assets/services/repertoire.service';
import { SetlistModel, SongModel } from '../../../../assets/models/repertoire.model';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss']
})
export class RepertoireComponent implements OnInit {
  setlists: SetlistModel[] = [];
  songs: SongModel[] = [];

  repertoireMock = [
    {
      title: 'A Bad Ballad',
      artist: 'Josh Moograine'
    },
    {
      title: 'Drugs with Nora',
      artist: 'Josh Moograine'
    },
    {
      title: 'Shadow of a Man',
      artist: 'Josh Moograine'
    },
    {
      title: 'Shalla',
      artist: 'Josh Moograine'
    },
    {
      title: 'Sociopath to His Girlfriend',
      artist: 'Josh Moograine'
    },
    {
      title: 'Glance',
      artist: 'Josh Moograine'
    },
    {
      title: 'Weirdo',
      artist: 'Josh Moograine'
    },
    {
      title: 'Ise Kream',
      artist: 'Josh Moograine'
    },
    {
      title: 'How to Seduce',
      artist: 'Josh Moograine'
    },
    {
      title: 'Óda',
      artist: 'Josh Moograine'
    },
    {
      title: 'How to Seduce',
      artist: 'Josh Moograine'
    },
    {
      title: 'Go Go Muck',
      artist: 'The Cramps'
    }, {
      title: 'How to Seduce',
      artist: 'Josh Moograine'
    },
    {
      title: 'Killing in the name',
      artist: 'Rage Against The Machine'
    },
    {
      title: 'Begging',
      artist: 'Måneskin'
    }, {
      title: 'No Good',
      artist: 'Kaleo'
    },
    {
      title: 'Guitar',
      artist: 'Peter Nalitch'
    },
    {
      title: 'Before He Cheats',
      artist: 'Carrie Underwood'
    }
  ]
  showRepertoireCreatorModal = false;
  showRepertoireEditorModal = false;

  constructor(private repertoireService: RepertoireService) {
  }

  ngOnInit() {
    this.initializeSetlists();
    this.initializeSongs();
  }

  initializeSetlists(): void {
    this.setlists = this.repertoireService.setlistCollection;
  }

  initializeSongs(): void {
    this.songs = this.repertoireService.songCollection;
  }

  openRepertoireCreatorModal(): void {
    this.showRepertoireCreatorModal = true;
  }

  openRepertoireEditorModal(): void {
    this.showRepertoireEditorModal = true;
  }
}
