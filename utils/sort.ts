export default interface ISortFn {
  property: 'createdAt' | 'lastName' | 'birthday' | 'gender' | 'events';
  isDescending: boolean;
}

export function registrationSort(objectA: any, objectB: any, sortFn: ISortFn) {
  let result;

  if (sortFn.property === 'createdAt' || sortFn.property === 'birthday') {
    result = () => {
      if (
        new Date(objectA[sortFn.property]) > new Date(objectB[sortFn.property])
      ) {
        return 1;
      } else if (
        new Date(objectA[sortFn.property]) < new Date(objectB[sortFn.property])
      ) {
        return -1;
      } else {
        return 0;
      }
    };
  } else if (sortFn.property === 'events') {
    result = () => {
      if (objectA.races[0].name > objectB.races[0].name) {
        return 1;
      } else if (objectA.races[0].name < objectB.races[0].name) {
        return -1;
      } else {
        return 0;
      }
    };
  } else {
    result = () => {
      if (objectA[sortFn.property] > objectB[sortFn.property]) {
        return 1;
      } else if (objectA[sortFn.property] < objectB[sortFn.property]) {
        return -1;
      } else {
        return 0;
      }
    };
  }

  return sortFn.isDescending ? result() * -1 : result();
}
