<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase_orders_model extends CI_Model 
{
	


public function get_order_by_quotes_id($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('purchase_orders');
            $this->db->where('quotes_id', $id);
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



	public function get_purchase_orders_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('purchase_orders');
            $this->db->where('category_id', $id);
			$this->db->order_by('created_at','DESC');

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



public function count_purchase_orders($id)
	{
	$this->db->select('*');
	$this->db->from('purchase_orders');
	$this->db->where('purchase_orders.user_id', $id);

	echo $this->db->count_all_results();

	}




public function count_total_purchase_orders($id)
	{
   $query = $this->db->query("select id, sum(total) as total_amt from purchase_orders WHERE user_id = '$id'");

				foreach ($query->result() as $row)
				{
				    echo $row->total_amt;
				}

	
	}





	public function get_purchase_orders_by_appointment_id($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('purchase_orders');
            $this->db->where('appointment_id', $id);
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


	public function get_purchase_orders_by_appointments($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('purchase_orders');
            $this->db->where('appointment_id', $id);
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

	public function get_purchase_orders($id)
	{

			$this->db->select('*');
            $this->db->from('purchase_orders');
			$this->db->where('purchase_orders.user_id', $id);

			$this->db->order_by('created_at','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function get_id($id)
	{

		$this->db->select('purchase_orders.*, u.first_name, u.last_name');
			$this->db->from('purchase_orders');
			$this->db->join('users u', 'u.id=purchase_orders.user_id');
			$this->db->where('purchase_orders.id', $id);
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
		$this->db->insert('purchase_orders', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('purchase_orders', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('purchase_orders');
	}


}
