import { firestore } from 'firebase';

export interface AvisoI {
    prueba: string;
    date: firestore.Timestamp;
    user: string;
    id: string;
}
