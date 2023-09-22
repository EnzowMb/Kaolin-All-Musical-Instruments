import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { InstrumentService } from '../services/InstrumentService';
import { InstrumentController } from './InstrumentController';
import { Request } from 'express';

describe('InstrumentController', () => {
  const mockInstrumentService: Partial<InstrumentService> = {
    createInstrument: jest.fn(),
  };

  const instrumentController = new InstrumentController(
    mockInstrumentService as InstrumentService
  );

  it('Should add a new user', () => {
    const mockRequest = {
      body: {
        name: 'Pandeiro',
        family: 'pao',
      },
    } as Request;
    const mockResponse = makeMockResponse();
    instrumentController.createInstrument(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
  });
});
