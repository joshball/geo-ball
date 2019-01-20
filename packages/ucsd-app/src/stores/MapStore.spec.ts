
import { MapState } from './MapState';
import { autorun } from 'mobx';


describe('matching cities to foods', () => {
    // Applies only to tests in this describe block
    let ms: MapState;

    beforeEach(() => {
        ms = new MapState();
        autorun(() => console.log('ms.zoom', ms.zoom))
    });

    test('ms.zoom default', () => {
        expect(ms.zoom).toBe(17);
    });

    test('ms.zoom can be set', () => {
        expect(ms.zoom).toBe(17);
        ms.zoom = 4;
        ms.zoom = 7;
        ms.zoom = 4;
        expect(ms.zoom).toBe(4);
    });

});
