<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['user_id' => 1, 'role_id' => 2, 'username' => 'First User', 'email' => 'firstuser@mail.com', 'password' => bcrypt('asdasd')],
            ['user_id' => 2, 'role_id' => 2, 'username' => 'Second User', 'email' => 'seconduser@mail.com', 'password' => bcrypt('asdasd')]
        ]);
    }
}
