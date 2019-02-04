import { connect } from 'react-redux'
import Router from 'app/client/router'

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(Router)
