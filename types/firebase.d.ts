declare module "firebase/firestore" {
  export function getFirestore(app?: any): any;
  export function doc(db: any, path: string, ...pathSegments: string[]): any;
  export function getDoc(reference: any): Promise<any>;
  export function setDoc(reference: any, data: any, options?: any): Promise<void>;
  export function collection(db: any, path: string, ...pathSegments: string[]): any;
  export function onSnapshot(reference: any, onNext: (snapshot: any) => void, onError?: (error: any) => void): () => void;
  export function deleteDoc(reference: any): Promise<void>;
}

declare module "firebase/storage" {
  export function getStorage(app?: any): any;
}
