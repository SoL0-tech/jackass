import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private title = 'Jackass Client';
  private displayedColumns = ['path', 'size', 'attr'];

  private fg: FormGroup;
  private loading = false;
  private error = false;

  private dataSource = new MatTableDataSource<FileItem>([]);
  private totalSize = 0;
  private resultsLength = 0
  private remotePath = '';

  constructor(
    private fb: FormBuilder,
    private _http: HttpClient
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.fg = this.fb.group({
      path: this.fb.control({
        value: '',
        disabled: false,
      }),
      isRecursive: this.fb.control({
        value: false,
        disabled: false,
      }),
    });
  }

  private onSubmit({ path, isRecursive }): void {
    this.error = false;
    this.loading = true;

    this.fetchListing(path, isRecursive).subscribe((data: ApiData) => {
      this.dataSource.data = data.files;
      this.totalSize = data.size;
      this.resultsLength = data.files.length;
      this.remotePath = data.path;

      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    }, err => {
      this.error = true;
      this.loading = false;
      this.dataSource.data = [];
    })
  }

  private onReset(): void {
    this.fg.reset();
  }

  private fetchListing(path: string, isRecursive: boolean): Observable<ApiData> {
    const encodedPath = encodeURIComponent(path);
    const recursiveSuffix = isRecursive ? '?recursive' : '';

    return this._http.get<ApiData>(`http://localhost:3000/${encodedPath}${recursiveSuffix}`);
  }

  private canSubmit(): boolean {
    return this.fg.valid && this.fg.controls['path'].value !== '';
  }

  private hasData(): boolean {
    return this.dataSource.data.length > 0;
  }
}

export interface ApiData {
  files: FileItem[];
  path: string;
  size: number;
}

export interface FileItem {
  attr: string;
  path: string;
  size: number;
}

