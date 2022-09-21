<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shop_Orders_model extends CI_Model 
{
	


public function get_order_by_quotes_id($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('shop_orders');
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



	public function get_shop_orders_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('shop_orders');
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



	public function get_last_order_after_checkout($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('shop_orders');
            $this->db->where('shop_orders.user_id', $id);
			$this->db->order_by('created_at','DESC');
			$this->db->limit(1);

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





public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('shop_orders');
			//$this->db->like('works.category_name', $category_name);
			//$this->db->like('works.category_description', $category_description);
			$this->db->where('shop_orders.user_id', $user_id);

			 if($category_name!=NULL && $category_description!=NULL)
				{
				//$this->db->where('created_at >=',$startup_startDate); 
	            //$this->db->where('created_at <=',$startup_endDate);
				$this->db->where("shop_orders.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
			   }



			$this->db->order_by('id', 'DESC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }
}




public function count_shop_orders_search($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('shop_orders');
	$this->db->where('shop_orders.user_id', $user_id);

	if($category_name!=NULL && $category_description!=NULL)
			{
			//$this->db->where('created_at >=',$startup_startDate); 
            //$this->db->where('created_at <=',$startup_endDate);
			$this->db->where("shop_orders.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
		   }
	
	return $this->db->count_all_results();
	
	}




public function count_shop_orders($id)
	{
	$this->db->select('*');
	$this->db->from('shop_orders');
	$this->db->where('shop_orders.user_id', $id);

	echo $this->db->count_all_results();

	}




public function count_total_shop_orders($id)
	{
   $query = $this->db->query("select id, sum(total) as total_amt from shop_orders WHERE user_id = '$id'");

				foreach ($query->result() as $row)
				{
				    echo $row->total_amt;
				}

	
	}





	public function get_shop_orders_by_appointment_id($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('shop_orders');
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


	public function get_shop_orders_by_appointments($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('shop_orders');
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

	public function get_shop_orders($id)
	{

			$this->db->select('*');
            $this->db->from('shop_orders');
			$this->db->where('shop_orders.user_id', $id);

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

			$this->db->select('shop_orders.*');
			$this->db->from('shop_orders');
			$this->db->where('shop_orders.id', $id);
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

	   $this->db->trans_start();
	   $this->db->insert('shop_orders',$blogData);
	   $insert_id = $this->db->insert_id();
	   $this->db->trans_complete();
	   return $insert_id;		
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('shop_orders', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('shop_orders');
	}


}
