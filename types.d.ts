declare module '*.csv' {
    const content: string;
    export default content;
  }

  interface HubSpotFormInstance {
    getFormId: () => string
    getFormFieldValues: () => Promise<Array<{ name: string; value: string | string[] }>>
    getConversionId: () => string
    getRedirectUrl: () => string
    setFieldValue: (name: string, value: string) => void
  }

  interface Window {
    HubSpotFormsV4?: {
      getFormFromEvent: (event: Event) => HubSpotFormInstance
      getForms: () => HubSpotFormInstance[]
    }
  }
  
  declare module "intl-tel-input/build/js/utils" {
    /**
     * `ItiUtils` is the utility object that intl-tel-input attaches when its utils script runs.
     * We tell TS that default export is that object.
     */
    import type { ItiUtils } from "intl-tel-input"
  
    /** The module’s default export IS the ItiUtils object itself */
    const utils: ItiUtils
    export default utils
  }
  