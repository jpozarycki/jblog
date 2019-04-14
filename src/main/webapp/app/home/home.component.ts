import { Component, OnInit } from '@angular/core';
import { IPost, Post } from 'app/shared/model/post.model';
import { PostService } from 'app/entities/post';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    posts: Post[];

    constructor(private postService: PostService, protected jhiAlertService: JhiAlertService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    private loadAll() {
        this.postService
            .query()
            .pipe(
                filter((res: HttpResponse<IPost[]>) => res.ok),
                map((res: HttpResponse<IPost[]>) => res.body)
            )
            .subscribe(
                (res: IPost[]) => {
                    this.posts = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
