import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import PluginCore from './PluginCore'

const Plugin = {
  install(app, options = {}) {
    if (app.config.globalProperties.$modal) {
      return
    }

    const plugin = PluginCore(app, options)

    Object.defineProperty(app.config.globalProperties, '$modal', {
      get: function() {
        /**
         * The "this" scope is the scope of the component that calls this.$modal
         */
        const caller = this
        /**
         * The this.$modal can be called only from inside the vue components so this check is not really needed...
         */
        console.log(caller instanceof app)
        if (caller instanceof app) {
          const root = caller.$root

          if (!plugin.context.root) {
            plugin.setDynamicModalContainer(root)
          }
        }

        return plugin
      }
    })

    app.provide('$modal', plugin)

    /**
     * Sets custom component name (if provided)
     */
    app.component(plugin.context.componentName, Modal)

    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      app.component('VDialog', Dialog)
    }
  }
}

export default Plugin
