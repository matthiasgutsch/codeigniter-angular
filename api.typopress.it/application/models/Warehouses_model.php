<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Warehouses_model extends CI_Model 
{
	

	public function get_warehouses_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('warehouses');
            $this->db->where('category_id', $id);
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

        } else {
            return null;
        }

    }



public function get_warehouses_calendar()
	{

			$this->db->select('*');
            $this->db->from('warehouses');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	

public function get_warehouses($user_id)
	{

			$this->db->select('*');
            $this->db->from('warehouses');
			$this->db->where('warehouses.user_id', $user_id);
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}






	public function count_warehouses($id)
	{
	$this->db->select('*');
	$this->db->from('warehouses');
	$this->db->where('warehouses.user_id', $id);
	echo $this->db->count_all_results();

	}





public function get_warehouses_date($id)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('warehouses');
			$this->db->where('warehouses.user_id', $id);
			$this->db->where('date(Date)',$curr_date);//use date function
			$this->db->order_by('date','ASC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function get_id($id)
	{

		$this->db->select('warehouses.*, u.first_name, u.last_name');
			$this->db->from('warehouses');
			$this->db->join('users u', 'u.id=warehouses.user_id');
			$this->db->where('warehouses.id', $id);
			$query = $this->db->get();
			return $query->row();
	}

	

	public function login($username, $password) 
	{
		$this->db->where('username', $username);
		$this->db->where('password', md5($password));
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return $query->row();
		}
	}


	public function checkToken($token)
	{
		$this->db->where('token', $token);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}

	public function create($blogData)
	{
		$this->db->insert('warehouses', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('warehouses', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('warehouses');
	}


}
