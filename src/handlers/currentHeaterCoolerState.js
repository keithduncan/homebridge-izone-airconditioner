import { readHandler } from './'

// The "current" state is intended to be what the cooler is doing regardless of the target mode.
// e.g. if the target mode is set to cool to 24c but the indoor temp is 22c then the current state might be IDLE
// The iZone controller doesn't implement this so assume it is doing what it is tasked with.

// static readonly INACTIVE = 0;
// static readonly IDLE = 1;
// static readonly HEATING = 2;
// static readonly COOLING = 3;

export const get = (api, log, Characteristic) =>
  readHandler('CurrentHeaterCoolerState', api.getPowerAndMode, log, value => {
    const [power, mode] = value

    if (!power) return Characteristic.CurrentHeaterCoolerState.INACTIVE

    switch (mode) {
      case 'cool':
        return Characteristic.CurrentHeaterCoolerState.COOLING
      case 'heat':
        return Characteristic.CurrentHeaterCoolerState.HEATING
      case 'vent':
        return Characteristic.CurrentHeaterCoolerState.COOLING
      case 'dry':
        return Characteristic.CurrentHeaterCoolerState.COOLING
      case 'auto':
        return Characteristic.CurrentHeaterCoolerState.COOLING
      default:
        throw `Unrecognized value ${value}`
    }
  })
