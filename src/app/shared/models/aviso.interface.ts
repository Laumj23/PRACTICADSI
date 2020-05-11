import { firestore } from 'firebase';

export interface AvisoI {
    prueba: string;
    date: firestore.Timestamp;
    description: string;
    user: string;
    id: string;
}
