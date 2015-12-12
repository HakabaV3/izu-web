export default function APIState(params){
    return Object.assign({
        isActive: false,
        error: null,
        errorMessage: ''
    }, params)
}
