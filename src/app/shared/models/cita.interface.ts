import { firestore } from 'firebase';

export interface CitaI {
    centro: string;
    consulta: string;
    date: firestore.Timestamp;
    doctor: string;
    user: string;
    id?: string;
}
