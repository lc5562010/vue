<template>
    <header>
        <div class="titleBox">
            <h1>门锁后台管理系统</h1>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>
    
<style lang="less" scoped>
    header {
        width: 100%;
        background: #2e333d;
        .titleBox {
            width: 95%;
            height: 65px;
            margin: 0 auto;
            h1 {
                color: #fff;
                font-family: 'Courier New', Courier, monospace;
                height: 65px;
                line-height: 65px;
            }
        }
       
    }
</style>

