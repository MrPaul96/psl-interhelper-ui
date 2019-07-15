import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Interview } from '../models/interview.model';
import { from, Observable } from 'rxjs';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable()
export class InterviewService {

    constructor(private angularFireStore: AngularFirestore) {
    }

    getInterviewsCollection(): AngularFirestoreCollection<Interview> {
        return this.angularFireStore.collection<Interview>('interviews');
    }

    addInterview(interview: Interview) {
        const interviewCollection = this.getInterviewsCollection();
        const idGenerated = this.angularFireStore.createId();
        const interviewToDB: Interview = { ...interview, id: idGenerated };
        return from(interviewCollection.doc(idGenerated).set(interviewToDB));
    }

    getInterviews(): Observable<Interview[]> {
        const interviewsCollection = this.getInterviewsCollection();

        return interviewsCollection
            .snapshotChanges()
            .pipe(map(changes => this.handleInterviewData(changes)));

    }

    handleInterviewData(changes) {
        return changes
            .map(action => this.getInterviewData(action));
    }

    getInterviewData(action): Interview {
        return action.payload.doc.data() as Interview;
    }
}
