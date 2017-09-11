import Redis from 'ioredis'
import config from '../../config/config'

const RDS_PORT = config.redisConfig.port ,        //端口号
    RDS_HOST = config.redisConfig.host ,    //服务器IP
    RDS_PWD = config.redisConfig.auth_pass ,    //密码

    // redis = Redis.createClient(RDS_PORT , RDS_HOST , RDS_OPTS)
    redis = Redis({
        port:RDS_PORT ,          // Redis port
        host:RDS_HOST ,   // Redis host
        password:RDS_PWD ,
    })
const setToken = async (token) =>{
    if (typeof token === 'string') {
        redis.set('zxsyJsToken' , token , 'EX' , 7000)
        return token
    }
    else {
        return false
    }
}
const getToken = async () =>{
    return redis.get('zxsyJsToken' , async function (err , reply){
        return reply
    })

}
const resetToken = async () =>{
    console.log('resetToken')
    redis.set('zxsyJsToken' , 'b' , 'EX' , 1)
    return true

}
export default {setToken , getToken , resetToken}

