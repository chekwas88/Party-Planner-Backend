/* eslint-disable no-undef */
import {removeDuplicates} from '@helpers';

describe('test helper functions', () => {
    const duplicateArray = [
        {id: 'a', value: 1},
        {id: 'a', value: 1},
        {id: 'c', value: 3},
        {id: 'd', value: 4},
        {id: 'e', value: 5},
        
    ]
  
    it('should test if duplicated items on an array of object is streamlined to return only one of the duplicated item',
    () => {
        const uniqueArray = removeDuplicates(duplicateArray);
        expect(uniqueArray.length).toBeLessThan(duplicateArray.length);
    })

})
