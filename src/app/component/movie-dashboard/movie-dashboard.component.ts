import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IMovie } from 'src/app/modules/movie-module';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {


movies : Array<IMovie> = [
  {
    movieId: '1',
    movieName: '3 Idiots',
    director: 'Rajkumar Hirani',
    genre: 'Comedy Drama',
    releaseYear: 2009,
    rating: 8.4
  },
  {
    movieId: '2',
    movieName: 'Dangal',
    director: 'Nitesh Tiwari',
    genre: 'Sports Drama',
    releaseYear: 2016,
    rating: 8.3
  },
  {
    movieId: '3',
    movieName: 'Drishyam',
    director: 'Nishikant Kamat',
    genre: 'Thriller',
    releaseYear: 2015,
    rating: 8.2
  },
  {
    movieId: '4',
    movieName: 'Zindagi Na Milegi Dobara',
    director: 'Zoya Akhtar',
    genre: 'Adventure Drama',
    releaseYear: 2011,
    rating: 8.2
  },
  {
    movieId: '5',
    movieName: 'Chhichhore',
    director: 'Nitesh Tiwari',
    genre: 'Comedy Drama',
    releaseYear: 2019,
    rating: 8.3
  }
];


 isInEditMode: boolean = false;
  editId!: string;
  // ViewChild References
  @ViewChild('movieNameRef')movieNameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('directorRef')directorRef!: ElementRef<HTMLInputElement>;
  @ViewChild('genreRef')genreRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('releaseYearRef')releaseYearRef!: ElementRef<HTMLInputElement>;
  @ViewChild('ratingRef')ratingRef!: ElementRef<HTMLInputElement>;

  constructor(
    private _uuidService: UuidService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

   // Reset Form
   onReset() {
    this.movieNameRef.nativeElement.value = '';
    this.directorRef.nativeElement.value = '';
    this.genreRef.nativeElement.value = '';
    this.releaseYearRef.nativeElement.value = '';
    this.ratingRef.nativeElement.value = '';
  }

   // Add Mobile
  onMovieAdd() {

    let newMovie: IMovie = {
      movieId: this._uuidService.getUuid(),
      movieName: this.movieNameRef.nativeElement.value,
      director: this.directorRef.nativeElement.value,
      genre: this.genreRef.nativeElement.value,
      releaseYear: Number(this.releaseYearRef.nativeElement.value),
      rating: Number(this.ratingRef.nativeElement.value)
    };

    this.movies.unshift(newMovie);

    this.onReset();

    this._snackbar.openSnackbar(
      `Movie with id ${newMovie.movieId} added successfully!`
    );
  }

   // Edit Mobile
 onMovieEdit(movie: IMovie) {
    this.isInEditMode = true;
    this.editId = movie.movieId;
    this.movieNameRef.nativeElement.value = movie.movieName;
    this.directorRef.nativeElement.value = movie.director;
    this.genreRef.nativeElement.value = movie.genre;
    this.releaseYearRef.nativeElement.value =
      movie.releaseYear.toString();
    this.ratingRef.nativeElement.value =
      movie.rating.toString();
  }

  // Update Mobile
  onMovieUpdate() {

     let updatedMovie: IMovie = {
      movieId: this.editId,
      movieName: this.movieNameRef.nativeElement.value,
      director: this.directorRef.nativeElement.value,
      genre: this.genreRef.nativeElement.value,
      releaseYear: Number(this.releaseYearRef.nativeElement.value),
      rating: Number(this.ratingRef.nativeElement.value)
    };

    let getIndex = this.movies.findIndex(
      m => m.movieId === this.editId
    );

    this.movies.splice(getIndex, 1, updatedMovie);

    this.onReset();

    this._snackbar.openSnackbar(
      `Movie with id ${this.editId} updated successfully!`
    );

     this.isInEditMode = false;
    this.editId = '';
  }

  // Delete Mobile
 onMovieDelete(movieId: string) {

    let getConfirm = confirm(
      `Are you sure you want to delete movie with id ${movieId}?`
    );

    if (getConfirm) {
      let removeIndex = this.movies.findIndex(
        m => m.movieId === movieId
      );

      if (removeIndex !== -1) {

        this.movies.splice(removeIndex, 1);

        this._snackbar.openSnackbar(
          `Movie with id ${movieId} deleted successfully!`
        );
      }
    }
  }

  // TrackBy

  trackByMovieId(index: number, movie: IMovie) {
    return movie.movieId;
  }
}
