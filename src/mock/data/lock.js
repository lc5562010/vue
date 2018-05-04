import Mock from "mockjs"
 
const Locks = [];
for (let i=0; i<10; i++){
    Locks.push(Mock.mock({
        id: Mock.Random.integer(60, 100),
        lockName: '智能门锁',  
        lockAddress: '@province' + '@city' + '@county',
        lockId: '@string(6,10)',
        lockState: '@string("是否",1)',
    }))
}
 
export {Locks}