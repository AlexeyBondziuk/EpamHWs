import { MinsToHoursConverterPipe } from './mins-to-hours-converter.pipe';

describe('MinsToHoursConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new MinsToHoursConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
